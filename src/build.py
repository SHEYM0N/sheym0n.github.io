import base64, os, re
A='assets/'
def b64(path,mime): return f"url(data:{mime};base64,"+base64.b64encode(open(path,'rb').read()).decode()+")"
def phone(n,extra=''): return f'<div class="phone-wrap"><div class="phone" style="--shot:var(--i-g{n})"><div class="screen"></div></div></div>'

head_style='<style>:root{--i-logo:'+b64(A+'monogram.png','image/png')+'}\n'+open('styles.css',encoding='utf-8').read()+open('v19.css',encoding='utf-8').read()+open('v20.css',encoding='utf-8').read()+open('v21.css',encoding='utf-8').read()+open('v22.css',encoding='utf-8').read()+open('v23.css',encoding='utf-8').read()+'</style>'

vars_=[('--i-tbg','trade-bg.webp','image/webp'),('--i-appicon','app-icon.webp','image/webp'),('--i-sticon','stellar-icon.webp','image/webp'),('--i-taz','tarazino.svg','image/svg+xml')]
vars_+=[(f'--i-g{i}',f'game-{i}.webp','image/webp') for i in range(1,7)]
asset_style='<style>:root{'+';'.join(f'{k}:{b64(A+f,m)}' for k,f,m in vars_)+'}</style>'

def tpl(name,html): return f'<template id="tpl-{name}">{html}</template>'
templates=''.join([
 tpl('t-main',open('t_main.frag',encoding='utf-8').read()),
 tpl('t-alt',open('t_alt.frag',encoding='utf-8').read()),
 tpl('t-hist',open('t_hist.frag',encoding='utf-8').read()),
 tpl('cover-trade','<div class="cover cover-trade"><div class="c-win"><div class="tscale" data-tpl="t-main" style="aspect-ratio:1500/840"></div></div><div class="c-hist"><div class="tscale" data-tpl="t-hist" style="aspect-ratio:1000/640"></div></div><span class="c-app"></span></div>'),
 tpl('cover-stellar','<div class="cover cover-stellar"><div class="c-ph c-l">'+phone(2)+'</div><div class="c-ph c-r">'+phone(5)+'</div><div class="c-ph c-c">'+phone(1)+'</div></div>'),
 tpl('cover-tarazino','<div class="cover cover-tarazino"></div>'),
])
html=open('index.src.html',encoding='utf-8').read()
html=html.replace('{{HEAD_STYLE}}',head_style).replace('{{ASSET_STYLE}}',asset_style).replace('{{TEMPLATES}}',templates).replace('{{SCRIPT}}',open('script.js',encoding='utf-8').read().replace('/*{{V19}}*/',open('v19.js',encoding='utf-8').read()).replace('/*{{V20}}*/',open('v20.js',encoding='utf-8').read()+open('v21.js',encoding='utf-8').read()))
os.makedirs('dist',exist_ok=True)
open('dist/index.html','w',encoding='utf-8').write(html)
import shutil
for f in ('favicon.png','apple-touch-icon.png','icon-192.png','og-image.jpg'): shutil.copy(A+f,'dist/'+f)
print('index.html',round(len(html.encode())/1024),'KB')
