run:
	docker run -it --rm --publish 3000:80 -v "$$(pwd):/usr/share/nginx/html" nginx:alpine
