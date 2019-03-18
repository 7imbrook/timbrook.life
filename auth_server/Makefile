

protos: clean_proto go_deps
	protoc -I ./protos \
		--python_out ./twirp \
		--twirp_python_out ./twirp \
		--twirp_python_srv_out ./twirp \
	./protos/*

clean_proto:
	rm -fr ./twirp/*

go_deps:
	go get -u github.com/twitchtv/twirp/protoc-gen-twirp
	go get -u github.com/twitchtv/twirp/protoc-gen-twirp_python
	go get -u github.com/daroot/protoc-gen-twirp_python_srv
