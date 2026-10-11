import random, math, json, sys

def series(seed, n, start, drift, vol):
    R=random.Random(seed); c=[]; p=start
    for i in range(n):
        o=p; ch=R.gauss(drift,vol)*p; cl=o+ch
        hi=max(o,cl)+abs(R.gauss(0,vol*.6))*p; lo=min(o,cl)-abs(R.gauss(0,vol*.6))*p
        v=R.uniform(.6,1.4)*(1+abs(ch/p)*90)
        c.append((o,hi,lo,cl,v)); p=cl
    return c
def sma(a,n): return [None if i<n-1 else sum(a[i-n+1:i+1])/n for i in range(len(a))]
def rsi(cl,n=14):
    g=l=0; out=[None]*len(cl)
    for i in range(1,len(cl)):
        d=cl[i]-cl[i-1]; u=max(d,0); dn=max(-d,0)
        if i<=n: g+=u/n; l+=dn/n
        else: g=(g*(n-1)+u)/n; l=(l*(n-1)+dn)/n
        if i>=n: out[i]=100-100/(1+g/(l or 1e-9))
    return out
def fmt(x,dec): return f"{x:,.{dec}f}"

def chart_svg(cs,W,H,dec,show_vol=True):
    cl=[c[3] for c in cs]; ma=sma(cl,20)
    sd=[None if i<19 else (sum((x-ma[i])**2 for x in cl[i-19:i+1])/20)**.5 for i in range(len(cl))]
    up=[None if ma[i] is None else ma[i]+2*sd[i] for i in range(len(cl))]
    lo=[None if ma[i] is None else ma[i]-2*sd[i] for i in range(len(cl))]
    lo_all=min(min(c[2] for c in cs),min(x for x in lo if x)); hi_all=max(max(c[1] for c in cs),max(x for x in up if x))
    pad=(hi_all-lo_all)*.06; lo_all-=pad; hi_all+=pad
    top,bot,left,right=14,H-60,10,64
    cw=(W-left-right)/len(cs)
    Y=lambda v: top+(hi_all-v)/(hi_all-lo_all)*(bot-top)
    X=lambda i: left+cw*(i+.5)
    s=f'<svg viewBox="0 0 {W} {H}" width="{W}" height="{H}" xmlns="http://www.w3.org/2000/svg">'
    for k in range(6):
        v=lo_all+(hi_all-lo_all)*k/5; y=Y(v)
        s+=f'<line x1="{left}" x2="{W-right}" y1="{y:.1f}" y2="{y:.1f}" stroke="#fff" stroke-opacity=".08"/><text x="{W-right+8}" y="{y+4:.1f}" fill="#9BA7B8" font-size="11" font-family="DejaVu Sans">{fmt(v,dec)}</text>'
    # bollinger fill
    pts=[(X(i),Y(up[i])) for i in range(len(cs)) if up[i]]+[(X(i),Y(lo[i])) for i in reversed(range(len(cs))) if lo[i]]
    s+='<polygon points="'+' '.join(f'{x:.1f},{y:.1f}' for x,y in pts)+'" fill="#6E40C9" fill-opacity=".14"/>'
    for arr,col in ((up,'#B392F0'),(lo,'#B392F0')):
        s+='<polyline fill="none" stroke="'+col+'" stroke-width="1.3" stroke-opacity=".8" points="'+' '.join(f'{X(i):.1f},{Y(arr[i]):.1f}' for i in range(len(cs)) if arr[i])+'"/>'
    s+='<polyline fill="none" stroke="#F0883E" stroke-width="1.8" points="'+' '.join(f'{X(i):.1f},{Y(ma[i]):.1f}' for i in range(len(cs)) if ma[i])+'"/>'
    vmax=max(c[4] for c in cs)
    for i,(o,h,l,c,v) in enumerate(cs):
        col='#4BFFA3' if c>=o else '#FF6B6B'
        x=X(i)
        if show_vol:
            vh=v/vmax*44; s+=f'<rect x="{x-cw*.3:.1f}" y="{H-14-vh:.1f}" width="{cw*.6:.1f}" height="{vh:.1f}" fill="{col}" fill-opacity=".28" rx="1.5"/>'
        s+=f'<line x1="{x:.1f}" x2="{x:.1f}" y1="{Y(h):.1f}" y2="{Y(l):.1f}" stroke="{col}" stroke-width="1.4"/>'
        s+=f'<rect x="{x-cw*.32:.1f}" y="{min(Y(o),Y(c)):.1f}" width="{cw*.64:.1f}" height="{max(abs(Y(o)-Y(c)),1.6):.1f}" fill="{col}" rx="1.5"/>'
    # support / resistance
    sup=min(c[2] for c in cs[-30:]); res=max(c[1] for c in cs[-30:])
    for v,col,lab in ((res,'#FFDF9E','R'),(sup,'#7CC8FF','S')):
        y=Y(v); s+=f'<line x1="{left}" x2="{W-right}" y1="{y:.1f}" y2="{y:.1f}" stroke="{col}" stroke-opacity=".7" stroke-dasharray="6 5"/><rect x="{W-right+2}" y="{y-9:.1f}" width="58" height="18" rx="5" fill="{col}" fill-opacity=".9"/><text x="{W-right+8}" y="{y+4:.1f}" font-size="11" font-weight="700" fill="#101520" font-family="DejaVu Sans">{fmt(v,dec)}</text>'
    # last price tag
    y=Y(cl[-1]); col='#4BFFA3' if cl[-1]>=cs[-1][0] else '#FF6B6B'
    s+=f'<line x1="{left}" x2="{W-right}" y1="{y:.1f}" y2="{y:.1f}" stroke="{col}" stroke-opacity=".55"/><rect x="{W-right+2}" y="{y-10:.1f}" width="58" height="20" rx="5" fill="{col}"/><text x="{W-right+8}" y="{y+4:.1f}" font-size="11" font-weight="700" fill="#08110C" font-family="DejaVu Sans">{fmt(cl[-1],dec)}</text>'
    for k in range(0,len(cs),10):
        s+=f'<text x="{X(k):.1f}" y="{H-2}" fill="#6B7686" font-size="10" font-family="DejaVu Sans" text-anchor="middle">{(9+k)%24:02d}:00</text>'
    return s+'</svg>', cl, sup, res

CSS='''
*{box-sizing:border-box;margin:0}
html,body{width:%(W)dpx;height:%(H)dpx;overflow:hidden;font-family:"DejaVu Sans",sans-serif;color:#F0F6FC;direction:ltr;position:relative;background:#080B12}
.bg{position:absolute;inset:0;background:url(bg.jpg) center/cover;filter:blur(18px) saturate(1.1) brightness(.62);transform:scale(1.08)}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,11,18,.55),rgba(7,11,18,.35))}
.win{position:absolute;inset:0;padding:16px 18px;display:flex;flex-direction:column;gap:12px}
.card{background:linear-gradient(180deg,rgba(21,28,41,.40),rgba(21,28,41,.62));border:1px solid rgba(255,255,255,.22);border-radius:16px;box-shadow:0 10px 30px -10px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.14)}
.top{display:flex;align-items:center;gap:18px;padding:0 4px;direction:ltr}
.logo{width:42px;height:42px;border-radius:11px}
.ttl{direction:rtl;text-align:right}.ttl b{font-size:22px;display:block;line-height:1.25}.ttl small{font-size:13px;color:#9BA7B8;direction:ltr;display:block;text-align:left}
.marq{flex:1;height:34px;border-radius:17px;background:rgba(21,28,41,.45);border:1px solid rgba(255,255,255,.14);overflow:hidden;position:relative;font-size:12.5px;color:#C9D4E3;white-space:nowrap;line-height:34px;direction:rtl;text-align:right;padding:0 16px}
.badge{background:rgba(35,134,54,.5);border:1px solid rgba(56,255,122,.35);color:#38FF7A;border-radius:12px;padding:5px 12px;font-size:12px;font-weight:700;display:flex;gap:7px;align-items:center}
.badge i{width:8px;height:8px;border-radius:50%%;background:#38FF7A;box-shadow:0 0 10px #38FF7A}
.controls{display:flex;gap:10px;align-items:center;direction:ltr}
.pricebox{display:flex;align-items:center;gap:10px;padding:0 16px;height:46px;direction:rtl}
.pricebox small{font-size:11px;color:#9BA7B8}.pricebox b{font-size:19px;font-variant-numeric:tabular-nums;direction:ltr}
.inp{height:46px;border-radius:12px;background:rgba(16,21,32,.55);border:1px solid rgba(255,255,255,.28);display:flex;align-items:center;padding:0 14px;font-size:16px;font-weight:700}
.inp.sym{width:130px;letter-spacing:.06em}.inp.tf{width:150px;justify-content:space-between;font-size:13px;direction:rtl;font-weight:600}.inp.tf span{color:#AAB4C4;font-size:11px}
.btn{height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13.5px;border:1px solid rgba(255,255,255,.33);padding:0 20px;background:rgba(31,111,235,.4);box-shadow:0 0 18px rgba(31,111,235,.35)}
.btn.p{background:rgba(110,64,201,.42);box-shadow:0 0 18px rgba(110,64,201,.35)}.btn.o{background:rgba(240,136,62,.40);box-shadow:0 0 18px rgba(240,136,62,.30)}.btn.g{background:rgba(85,96,120,.38);box-shadow:none}
.main{flex:1;display:flex;gap:12px;min-height:0;direction:ltr}
.tbl{width:340px;padding:12px;display:flex;flex-direction:column;gap:6px}
.th{display:grid;grid-template-columns:1.1fr 1fr 1fr 1fr 1fr;text-align:center;padding:5px 4px;border-radius:10px;background:rgba(21,28,41,.35)}
.th b{display:block;font-size:11px;color:#9BA7B8;direction:rtl}.th small{font-size:8.5px;color:#6B7686}
.tr{display:grid;grid-template-columns:1.1fr 1fr 1fr 1fr 1fr;text-align:center;font-size:11px;padding:6px 4px;border-bottom:1px solid rgba(255,255,255,.06);font-variant-numeric:tabular-nums}
.right{flex:1;display:flex;flex-direction:column;gap:12px;min-width:0}
.chartc{padding:12px 14px;height:%(CH)dpx;position:relative;overflow:hidden}.chartc svg{width:100%%;height:auto;display:block}
.tgl{position:absolute;top:12px;right:16px;display:flex;gap:8px;direction:rtl}.tgl span{font-size:11px;padding:3px 10px;border-radius:9px;border:1px solid rgba(255,255,255,.2);color:#C9D4E3;background:rgba(21,28,41,.4)}
.tgl span.on{background:rgba(110,64,201,.5);border-color:rgba(179,146,240,.6);color:#fff}
.cinfo span{unicode-bidi:plaintext}.cinfo{font-size:12px;color:#9BA7B8;margin-bottom:4px;direction:ltr;display:flex;gap:14px}.cinfo b{color:#F0F6FC}
.grid3{display:grid;grid-template-columns:1fr 1.25fr 1fr;gap:12px;flex:1;min-height:0;direction:rtl}
.pc{padding:14px 16px;display:flex;flex-direction:column;gap:9px;font-size:12.5px}
.pc h4{font-size:14px;display:flex;align-items:center;gap:8px}.pc h4 i{width:9px;height:9px;border-radius:50%%}
.big{font-size:20px;font-weight:700;line-height:1.5}
.row{display:flex;justify-content:space-between;color:#C9D4E3}.row b{color:#F0F6FC;direction:ltr;font-variant-numeric:tabular-nums}
.bar{height:8px;border-radius:5px;background:rgba(255,255,255,.12);overflow:hidden;direction:ltr}.bar i{display:block;height:100%%;border-radius:5px}
.ins{display:flex;gap:8px;align-items:flex-start;color:#D6DEE8;line-height:1.7}.ins:before{content:"";flex:none;margin-top:8px;width:6px;height:6px;border-radius:50%%;background:var(--c,#4BFFA3)}
.status{height:26px;display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:#9BA7B8;padding:0 8px;direction:rtl}.status b{color:#4BFFA3;font-weight:600}
.chip2{display:inline-block;padding:3px 10px;border-radius:9px;font-size:11.5px;font-weight:700}
'''

def main_view(cfg, out):
    W,H=1500,840
    cs=series(cfg['seed'],64,cfg['start'],cfg['drift'],cfg['vol']); dec=cfg['dec']
    svg,cl,sup,res=chart_svg(cs,1000,312,dec)
    r=rsi(cl)[-1]; chg=(cl[-1]/cl[-40]-1)*100
    rows=''
    for i in range(len(cs)-1,len(cs)-17,-1):
        o,h,l,c,v=cs[i]; col='#4ADE80' if c>=o else '#FF6B6B'
        rows+=f'<div class="tr"><span style="font-weight:600">{(9+i)%24:02d}:00</span><span style="color:#D6DEE8">{fmt(o,dec)}</span><span style="color:#4ADE80">{fmt(h,dec)}</span><span style="color:#FF6B6B">{fmt(l,dec)}</span><b style="color:{col}">{fmt(c,dec)}</b></div>'
    t=cfg['trend']
    ins=''.join(f'<div class="ins" style="--c:{c}">{x}</div>' for x,c in cfg['ins'])
    sl=cl[-1]-(cl[-1]-sup)*.9; rr=cfg['rr']
    html=f'''<!doctype html><meta charset=utf-8><style>{CSS%dict(W=W,H=H,CH=366)}</style>
<div class="bg"></div><div class="shade"></div>
<div class="win">
 <div class="top"><img class="logo" src="app-icon-256.png"><div class="ttl"><b>تحلیل ارزهای دیجیتال</b><small>CoinGecko API</small></div>
  <div class="marq">این برنامه صرفاً یک ابزار تحلیل تکنیکال است و توصیه‌ی مالی محسوب نمی‌شود &nbsp;|&nbsp; تحلیل‌ها فقط بر پایه‌ی داده‌های قیمتی گذشته انجام می‌شن</div>
  <div class="badge"><i></i>آنلاین</div></div>
 <div class="controls">
  <div class="card pricebox"><b>${fmt(cl[-1],dec)}</b><small>قیمت لحظه‌ای</small></div>
  <div class="inp card sym">{cfg['sym']}</div>
  <div class="inp card tf"><span>▾</span>{cfg['tf']}</div>
  <div class="btn">دریافت داده</div><div class="btn p">تحلیل روند</div><div class="btn o">ذخیره</div><div class="btn g">تاریخچه</div>
 </div>
 <div class="main">
  <div class="card tbl"><div class="th"><div><b>زمان</b><small>Time</small></div><div><b>باز</b><small>Open</small></div><div><b>بالا</b><small>High</small></div><div><b>پایین</b><small>Low</small></div><div><b>بسته</b><small>Close</small></div></div>{rows}</div>
  <div class="right">
   <div class="card chartc"><div class="tgl"><span class="on">باند بولین</span><span class="on">MA20</span><span>حجم</span></div>
    <div class="cinfo"><b>{cfg['sym']} / USD</b><span>{cfg['tf']}</span><span>تغییر: <b style="color:{'#4BFFA3' if chg>=0 else '#FF6B6B'}">{chg:+.2f}%</b></span></div><div style="width:100%">{svg}</div></div>
   <div class="grid3">
    <div class="card pc"><h4><i style="background:{t['col']}"></i>روند بازار</h4><div class="big" style="color:{t['col']}">{t['label']}</div>
     <div class="row"><span>قدرت سیگنال</span><b>{t['strength']}</b></div><div class="bar"><i style="width:{t['pct']}%;background:{t['col']}"></i></div>
     <div class="row"><span>تغییر در این بازه</span><b>{chg:+.2f}%</b></div><div class="row"><span>حمایت</span><b>{fmt(sup,dec)}</b></div><div class="row"><span>مقاومت</span><b>{fmt(res,dec)}</b></div></div>
    <div class="card pc"><h4><i style="background:#F0883E"></i>سیگنال معاملاتی</h4><div class="big" style="font-size:17px;color:{t['col']}">{cfg['verdict']}</div>{ins}</div>
    <div class="card pc"><h4><i style="background:#6E40C9"></i>شاخص‌ها</h4>
     <div class="row"><span>RSI</span><b>{r:.1f}</b></div><div class="row"><span>MA20</span><b>{fmt(sum(cl[-20:])/20,dec)}</b></div><div class="row"><span>حجم معاملات</span><b>{cfg['vol_txt']}</b></div>
     <div class="row"><span>حد ضرر پیشنهادی</span><b>{fmt(sl,dec)}</b></div><div class="row"><span>نسبت ریسک به ریوارد</span><b>1:{rr}</b></div><div class="row"><span>ADX</span><b>{cfg['adx']}</b></div></div>
   </div></div></div>
 <div class="status"><span>تایم‌فریم: {cfg['tf']}</span><b>● آماده · اتصال برقرار است</b></div>
</div>'''
    open(out+'.html','w',encoding='utf-8').write(html)

def history_view(out):
    W,H=1000,640
    items=[('BTC','2026-10-08  21:14','67,842','1 ساعت','صعودی','#4BFFA3'),('ETH','2026-10-08  20:52','3,524','15 دقیقه','صعودی','#4BFFA3'),('SOL','2026-10-07  18:03','168.4','6 ساعت','نزولی','#FF6B6B'),('SUI','2026-10-07  11:30','3.84','1 ساعت','صعودی','#4BFFA3'),('BNB','2026-10-06  22:41','592.1','12 ساعت','خنثی','#FFDF9E'),('XRP','2026-10-06  09:18','0.612','1 روز','نزولی','#FF6B6B'),('ADA','2026-10-05  17:55','0.468','30 دقیقه','صعودی','#4BFFA3')]
    css=CSS%dict(W=W,H=H,CH=300)+'''
    .hw{position:absolute;inset:0;padding:22px 26px;display:flex;flex-direction:column;gap:14px}.hw h1{font-size:26px;font-weight:700}
    .ht{display:grid;direction:ltr;text-align:left;grid-template-columns:110px 210px 130px 140px 120px 1fr;padding:10px 16px;font-size:12px;color:#9BA7B8;font-weight:700;border-bottom:1px solid rgba(255,255,255,.2)}
    .hr{display:grid;direction:ltr;text-align:left;grid-template-columns:110px 210px 130px 140px 120px 1fr;align-items:center;padding:11px 16px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.07);font-variant-numeric:tabular-nums}
    .hr:nth-child(even){background:rgba(255,255,255,.035)}.sm{height:28px;border-radius:9px;display:inline-flex;align-items:center;padding:0 12px;font-size:11.5px;font-weight:700;border:1px solid rgba(255,255,255,.25)}
    .foot{display:flex;justify-content:space-between;margin-top:auto;direction:rtl}'''
    rows=''.join(f'<div class="hr"><b>{a}</b><span style="color:#C9D4E3">{b}</span><span>${c}</span><span>{d}</span><b style="color:{col}">{e}</b><span style="display:flex;gap:6px;justify-content:flex-end"><span class="sm" style="background:rgba(31,111,235,.4)">مشاهده</span><span class="sm" style="background:rgba(229,72,77,.4)">حذف</span></span></div>' for a,b,c,d,e,col in items)
    html=f'''<!doctype html><meta charset=utf-8><style>{css}</style><div class="bg"></div><div class="shade"></div>
    <div class="hw"><h1>تاریخچه تحلیل‌ها</h1><div class="card" style="padding:6px 6px 10px"><div class="ht"><span>ارز</span><span>تاریخ ذخیره</span><span>قیمت</span><span>تایم‌فریم</span><span>روند</span><span></span></div>{rows}</div>
    <div class="foot"><div class="btn" style="background:rgba(229,72,77,.42);box-shadow:none">پاک‌سازی کامل</div><div class="btn g">بستن</div></div></div>'''
    open(out+'.html','w',encoding='utf-8').write(html)

