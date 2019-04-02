all: build flash

flash: 
	particle flash 460043000f51373331333230 firmware.bin

build:
	particle compile photon --saveTo firmware.bin

clean:
	rm *.bin