import multiprocessing
users=[
    "sgs",
    "simi"
]
for user in users:
    import subprocess
    subprocess.run(["pyinstaller","-F","{}.py".format(user)])
