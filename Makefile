
build_release:
	@ git pull
	@ npm run build
	@ sudo rm -r /var/www/html/portal-fiocruz/**
	@ sudo cp -rf /home/alunos_uerj/hugo.amorim/front-covid-fiocruz/build/** /var/www/html/portal-fiocruz/
