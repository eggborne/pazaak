DOSKEY lint=echo Linting... $T eslint src/** src/**/** $T echo Linted.
DOSKEY clr=rmdir dist /s
DOSKEY build=npm run build
DOSKEY clink="C:\Users\COCKMA~1\Desktop\cmder\vendor\clink/clink_x64.exe" --cfgdir "C:\Users\COCKMA~1\Desktop\cmder\config" $*
DOSKEY ;=Add aliases below here
DOSKEY e.=explorer .
DOSKEY gl=git log --oneline --all --graph --decorate  $*
DOSKEY ls=ls --show-control-chars -F --color $*
DOSKEY pwd=cd
DOSKEY clear=cls
DOSKEY history=cat "C:\Users\Cockmaster\Desktop\cmder\config\.history"
DOSKEY unalias=alias /d $1
DOSKEY vi=vim $*
DOSKEY cmderr=cd /d "C:\Users\Cockmaster\Desktop\cmder"
DOSKEY gs=git status
DOSKEY gpo=git push origin $*
DOSKEY gpom=git push origin master
DOSKEY ga=git add $*
DOSKEY gcom=git commit -m $*
DOSKEY serv=npm run start
DOSKEY mserv=webpack-dev-server --host 0.0.0.0
DOSKEY asrc=git add src/components/$*
