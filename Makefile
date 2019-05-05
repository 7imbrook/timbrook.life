

protos: go_deps
	protoc -I ./protos \
		--python_out ./auth_server/twirp \
		--python_out ./podcast_process/twirp \
		--python_out ./podcast/twirp \
		--twirp_python_out ./auth_server/twirp \
		--twirp_python_out ./podcast_process/twirp \
		--twirp_python_out ./podcast/twirp \
		--twirp_python_srv_out ./auth_server/twirp \
	./protos/*

go_deps:
	go get -u github.com/twitchtv/twirp/protoc-gen-twirp
	go get -u github.com/twitchtv/twirp/protoc-gen-twirp_python
	go get -u github.com/daroot/protoc-gen-twirp_python_srv
