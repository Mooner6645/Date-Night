import time

start_time = time.time()  # record the start time

while time.time() - start_time < 60:  # run for about 60 seconds
    print("Everything will Be okay")
    time.sleep(2)  # wait 2 seconds

print("Done :)")
