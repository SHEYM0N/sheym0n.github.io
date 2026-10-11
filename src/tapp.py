# Builds live (HTML/CSS/SVG) previews of the POYA TRADE interface, scoped under .tapp
import re
exec(open('tapp_lib.py',encoding='utf-8').read().split("CSS='''")[0])   # series, sma, rsi, fmt, chart_svg

def chart(cs,W,H,dec):
    svg,cl,sup,res=chart_svg(cs,W,H,dec)
    svg=svg.replace('font-family="DejaVu Sans"','').replace(' width="%d" height="%d"'%(W,H),'')
    return svg,cl,sup,res

def main_dom(cfg):
    cs=series(cfg['seed'],64,cfg['start'],cfg['drift'],cfg['vol']); dec=cfg['dec']
    svg,cl,sup,res=chart(cs,1000,312,dec)
    r=rsi(cl)[-1]; chg=(cl[-1]/cl[-40]-1)*100
    rows=''
    for i in range(len(cs)-1,len(cs)-17,-1):
        o,h,l,c,v=cs[i]; col='#4ADE80' if c>=o else '#FF6B6B'
        rows+=f'<div class="t-tr"><span class="t-b">{(9+i)%24:02d}:00</span><span style="color:#D6DEE8">{fmt(o,dec)}</span><span style="color:#4ADE80">{fmt(h,dec)}</span><span style="color:#FF6B6B">{fmt(l,dec)}</span><b style="color:{col}">{fmt(c,dec)}</b></div>'
    t=cfg['trend']; sl=cl[-1]-(cl[-1]-sup)*.9
    ins=''.join(f'<div class="t-ins" style="--c:{c}">{x}</div>' for x,c in cfg['ins'])
    cc='#4BFFA3' if chg>=0 else '#FF6B6B'
    return f'''<div class="tapp t-main"><div class="t-bg"></div><div class="t-shade"></div>
<div class="t-win">
 <div class="t-top"><div class="t-icon"></div><div class="t-ttl"><b>تحلیل ارزهای دیجیتال</b><small>Crypto Analysis</small></div>
  <div class="t-marq">این برنامه صرفاً یک ابزار تحلیل تکنیکال است و توصیه‌ی مالی محسوب نمی‌شود &nbsp;|&nbsp; تحلیل‌ها فقط بر پایه‌ی داده‌های قیمتی گذشته انجام می‌شن</div>
  <div class="t-badge"><i></i>آنلاین</div></div>
 <div class="t-controls">
  <div class="t-card t-pricebox"><b>${fmt(cl[-1],dec)}</b><small>قیمت لحظه‌ای</small></div>
  <div class="t-inp t-card t-sym">{cfg['sym']}</div>
  <div class="t-inp t-card t-tf"><span>▾</span>{cfg['tf']}</div>
  <div class="t-btn">دریافت داده</div><div class="t-btn t-p">تحلیل روند</div><div class="t-btn t-o">ذخیره</div><div class="t-btn t-g">تاریخچه</div>
 </div>
 <div class="t-mainrow">
  <div class="t-card t-tbl"><div class="t-th"><div><b>زمان</b><small>Time</small></div><div><b>باز</b><small>Open</small></div><div><b>بالا</b><small>High</small></div><div><b>پایین</b><small>Low</small></div><div><b>بسته</b><small>Close</small></div></div>{rows}</div>
  <div class="t-right">
   <div class="t-card t-chartc"><div class="t-tgl"><span class="t-on">باند بولینگر</span><span class="t-on">MA20</span><span>حجم</span></div>
    <div class="t-cinfo"><b>{cfg['sym']} / USD</b><span>{cfg['tf']}</span><span>تغییر: <b style="color:{cc}">{chg:+.2f}%</b></span></div>{svg}</div>
   <div class="t-grid3">
    <div class="t-card t-pc"><h4><i style="background:{t['col']}"></i>روند بازار</h4><div class="t-big" style="color:{t['col']}">{t['label']}</div>
     <div class="t-row"><span>قدرت سیگنال</span><b>{t['strength']}</b></div><div class="t-bar"><i style="width:{t['pct']}%;background:{t['col']}"></i></div>
     <div class="t-row"><span>تغییر در این بازه</span><b>{chg:+.2f}%</b></div><div class="t-row"><span>حمایت</span><b>{fmt(sup,dec)}</b></div><div class="t-row"><span>مقاومت</span><b>{fmt(res,dec)}</b></div></div>
    <div class="t-card t-pc"><h4><i style="background:#F0883E"></i>سیگنال معاملاتی</h4><div class="t-big" style="font-size:17px;color:{t['col']}">{cfg['verdict']}</div>{ins}</div>
    <div class="t-card t-pc"><h4><i style="background:#6E40C9"></i>شاخص‌ها</h4>
     <div class="t-row"><span>RSI</span><b>{r:.1f}</b></div><div class="t-row"><span>MA20</span><b>{fmt(sum(cl[-20:])/20,dec)}</b></div><div class="t-row"><span>حجم معاملات</span><b>{cfg['vol_txt']}</b></div>
     <div class="t-row"><span>حد ضرر پیشنهادی</span><b>{fmt(sl,dec)}</b></div><div class="t-row"><span>نسبت ریسک به ریوارد</span><b>1:{cfg['rr']}</b></div><div class="t-row"><span>ADX</span><b>{cfg['adx']}</b></div></div>
   </div></div></div>
 <div class="t-status"><span>تایم‌فریم: {cfg['tf']}</span><b>● آماده · اتصال برقرار است</b></div>
</div></div>'''

def hist_dom():
    items=[('BTC','2026-10-08  21:14','67,842','1 ساعت','صعودی','#4BFFA3'),('ETH','2026-10-08  20:52','3,524','15 دقیقه','صعودی','#4BFFA3'),('SOL','2026-10-07  18:03','168.4','6 ساعت','نزولی','#FF6B6B'),('SUI','2026-10-07  11:30','3.84','1 ساعت','صعودی','#4BFFA3'),('BNB','2026-10-06  22:41','592.1','12 ساعت','خنثی','#FFDF9E'),('XRP','2026-10-06  09:18','0.612','1 روز','نزولی','#FF6B6B'),('ADA','2026-10-05  17:55','0.468','30 دقیقه','صعودی','#4BFFA3')]
    rows=''.join(f'<div class="t-hr"><b>{a}</b><span style="color:#C9D4E3">{b}</span><span>${c}</span><span>{d}</span><b style="color:{col}">{e}</b><span style="display:flex;gap:6px;justify-content:flex-end"><span class="t-sm" style="background:rgba(31,111,235,.4)">مشاهده</span><span class="t-sm" style="background:rgba(229,72,77,.4)">حذف</span></span></div>' for a,b,c,d,e,col in items)
    return f'''<div class="tapp t-hist"><div class="t-bg"></div><div class="t-shade"></div><div class="t-hw"><h1>تاریخچه تحلیل‌ها</h1>
<div class="t-card" style="padding:6px 6px 10px"><div class="t-ht"><span>ارز</span><span>تاریخ ذخیره</span><span>قیمت</span><span>تایم‌فریم</span><span>روند</span><span></span></div>{rows}</div>
<div class="t-foot"><div class="t-btn" style="background:rgba(229,72,77,.42);box-shadow:none">پاک‌سازی کامل</div><div class="t-btn t-g">بستن</div></div></div></div>'''

CSS='''
.tscale{position:relative;overflow:hidden;background:#080B12}
.tscale>.tapp{position:absolute;left:0;top:0;transform-origin:0 0;transform:scale(var(--s,.5))}
.t-main{width:1500px;height:840px}.t-hist{width:1000px;height:640px}
.tapp{font-family:var(--font);color:#F0F6FC;direction:ltr;text-align:left;line-height:1.4;overflow:hidden;background:#080B12;-webkit-font-smoothing:antialiased}
.tapp *{box-sizing:border-box;margin:0}
.tapp b{font-weight:700}
.t-bg{position:absolute;inset:0;background:var(--i-tbg) center/cover no-repeat;transform:scale(1.05)}
.t-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,11,18,.45),rgba(7,11,18,.28))}
.t-win{position:absolute;inset:0;padding:16px 18px;display:flex;flex-direction:column;gap:12px}
.t-card{background:linear-gradient(180deg,rgba(21,28,41,.42),rgba(21,28,41,.66));border:1px solid rgba(255,255,255,.22);border-radius:16px;box-shadow:0 10px 30px -10px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.14)}
.t-top{display:flex;align-items:center;gap:18px;padding:0 4px}
.t-icon{width:42px;height:42px;border-radius:11px;background:var(--i-appicon) center/cover}
.t-ttl{direction:rtl;text-align:right}.t-ttl b{font-size:22px;display:block;line-height:1.3}.t-ttl small{font-size:13px;color:#9BA7B8;direction:ltr;display:block;text-align:left;font-family:var(--font-en)}
.t-marq{flex:1;height:34px;border-radius:17px;background:rgba(21,28,41,.45);border:1px solid rgba(255,255,255,.14);overflow:hidden;font-size:12.5px;color:#C9D4E3;white-space:nowrap;line-height:34px;direction:rtl;text-align:right;padding:0 16px}
.t-badge{background:rgba(35,134,54,.5);border:1px solid rgba(56,255,122,.35);color:#38FF7A;border-radius:12px;padding:5px 12px;font-size:12px;font-weight:700;display:flex;gap:7px;align-items:center;direction:rtl}
.t-badge i{width:8px;height:8px;border-radius:50%;background:#38FF7A;box-shadow:0 0 10px #38FF7A}
.t-controls{display:flex;gap:10px;align-items:center}
.t-pricebox{display:flex;align-items:center;gap:10px;padding:0 16px;height:46px;direction:rtl}
.t-pricebox small{font-size:11px;color:#9BA7B8}.t-pricebox b{font-size:19px;direction:ltr;font-family:var(--font-en);font-variant-numeric:tabular-nums}
.t-inp{height:46px;border-radius:12px;display:flex;align-items:center;padding:0 14px;font-size:16px;font-weight:700;font-family:var(--font-en)}
.t-sym{width:130px;letter-spacing:.06em}.t-tf{width:150px;justify-content:space-between;font-size:13px;direction:rtl;font-weight:600;font-family:var(--font)}.t-tf span{color:#AAB4C4;font-size:11px}
.t-btn{height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13.5px;border:1px solid rgba(255,255,255,.33);padding:0 20px;background:rgba(31,111,235,.4);box-shadow:0 0 18px rgba(31,111,235,.35)}
.t-btn.t-p{background:rgba(110,64,201,.42);box-shadow:0 0 18px rgba(110,64,201,.35)}.t-btn.t-o{background:rgba(240,136,62,.4);box-shadow:0 0 18px rgba(240,136,62,.3)}.t-btn.t-g{background:rgba(85,96,120,.38);box-shadow:none}
.t-mainrow{flex:1;display:flex;gap:12px;min-height:0}
.t-tbl{width:340px;padding:12px;display:flex;flex-direction:column;gap:6px;flex:none}
.t-th,.t-tr{display:grid;grid-template-columns:1.1fr 1fr 1fr 1fr 1fr;text-align:center}
.t-th{padding:5px 4px;border-radius:10px;background:rgba(21,28,41,.35)}
.t-th b{display:block;font-size:11px;color:#9BA7B8;direction:rtl}.t-th small{font-size:8.5px;color:#6B7686;font-family:var(--font-en)}
.t-tr{font-size:11px;padding:6px 4px;border-bottom:1px solid rgba(255,255,255,.06);font-family:var(--font-en);font-variant-numeric:tabular-nums}
.t-right{flex:1;display:flex;flex-direction:column;gap:12px;min-width:0}
.t-chartc{padding:12px 14px;height:366px;position:relative;overflow:hidden}.t-chartc svg{width:100%;height:auto;display:block}
.t-chartc svg text{font-family:var(--font-en)}
.t-tgl{position:absolute;top:12px;right:16px;display:flex;gap:8px;direction:rtl}.t-tgl span{font-size:11px;padding:3px 10px;border-radius:9px;border:1px solid rgba(255,255,255,.2);color:#C9D4E3;background:rgba(21,28,41,.4)}
.t-tgl span.t-on{background:rgba(110,64,201,.5);border-color:rgba(179,146,240,.6);color:#fff}
.t-cinfo span{unicode-bidi:plaintext}.t-cinfo{font-size:12px;color:#9BA7B8;margin-bottom:4px;display:flex;gap:14px}.t-cinfo b{color:#F0F6FC;font-family:var(--font-en)}
.t-grid3{display:grid;grid-template-columns:1fr 1.25fr 1fr;gap:12px;flex:1;min-height:0;direction:rtl}
.t-pc{padding:14px 16px;display:flex;flex-direction:column;gap:9px;font-size:12.5px;text-align:right}
.t-pc h4{font-size:14px;display:flex;align-items:center;gap:8px;font-weight:700}.t-pc h4 i{width:9px;height:9px;border-radius:50%}
.t-big{font-size:20px;font-weight:700;line-height:1.5}
.t-row{display:flex;justify-content:space-between;color:#C9D4E3}.t-row b{color:#F0F6FC;direction:ltr;font-family:var(--font-en);font-variant-numeric:tabular-nums}
.t-bar{height:8px;border-radius:5px;background:rgba(255,255,255,.12);overflow:hidden;direction:ltr}.t-bar i{display:block;height:100%;border-radius:5px}
.t-ins{display:flex;gap:8px;align-items:flex-start;color:#D6DEE8;line-height:1.7}.t-ins:before{content:"";flex:none;margin-top:9px;width:6px;height:6px;border-radius:50%;background:var(--c,#4BFFA3)}
.t-status{height:26px;display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:#9BA7B8;padding:0 8px;direction:rtl}.t-status b{color:#4BFFA3;font-weight:600}
.t-hw{position:absolute;inset:0;padding:22px 26px;display:flex;flex-direction:column;gap:14px}.t-hw h1{font-size:26px;font-weight:700;direction:rtl;text-align:right}
.t-ht,.t-hr{display:grid;grid-template-columns:110px 210px 130px 140px 120px 1fr;text-align:left}
.t-ht{padding:10px 16px;font-size:12px;color:#9BA7B8;font-weight:700;border-bottom:1px solid rgba(255,255,255,.2)}
.t-hr{align-items:center;padding:11px 16px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.07);font-family:var(--font);font-variant-numeric:tabular-nums}
.t-hr:nth-child(even){background:rgba(255,255,255,.035)}
.t-sm{height:28px;border-radius:9px;display:inline-flex;align-items:center;padding:0 12px;font-size:11.5px;font-weight:700;border:1px solid rgba(255,255,255,.25)}
.t-foot{display:flex;justify-content:space-between;margin-top:auto;direction:rtl}
'''
bull=dict(seed=11,start=66200,drift=.0007,vol=.0042,dec=2,sym='BTC',tf='1 ساعت',rr='2.4',adx='27 · روند قوی',vol_txt='بالاتر از حد معمول',
 trend=dict(label='صعودی',col='#4BFFA3',strength='قوی',pct=78),verdict='شرایط برای خرید مناسبه',
 ins=[('روند صعودی و نسبتاً معتبره، اندیکاتورها هم‌جهت هستن','#4BFFA3'),('الگوی چکش شناسایی شد','#FFDF9E'),('حجم معاملات بالاتر از حد معموله','#7CC8FF'),('واگرایی خاصی بین قیمت و RSI دیده نمی‌شه','#9BA7B8')])
bear=dict(seed=5,start=3720,drift=-.0006,vol=.0048,dec=2,sym='ETH',tf='15 دقیقه',rr='1.8',adx='31 · روند قوی',vol_txt='در حد عادی',
 trend=dict(label='نزولی',col='#FF6B6B',strength='متوسط',pct=55),verdict='زمان مناسبی برای خرید جدید نیست',
 ins=[('روند نزولی و نسبتاً معتبره، بهتره صبر کنی','#FF6B6B'),('الگوی انگالفینگ نزولی شناسایی شد','#FFDF9E'),('قیمت داره از باند پایین بولینگر فاصله می‌گیره','#B392F0'),('RSI پایینه ولی نشونه‌ی برگشت دیده نمی‌شه','#9BA7B8')])
if __name__=='__main__':
    open('t_main.frag','w',encoding='utf-8').write(main_dom(bull))
    open('t_alt.frag','w',encoding='utf-8').write(main_dom(bear))
    open('t_hist.frag','w',encoding='utf-8').write(hist_dom())
    open('tapp.css','w',encoding='utf-8').write(CSS)
    import os
    for f in ('t_main.frag','t_alt.frag','t_hist.frag','tapp.css'): print(f,os.path.getsize(f))
