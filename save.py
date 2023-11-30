import os
import json
from PIL import Image
from tqdm import tqdm
from urllib.request import urlopen


def save_images(links: tuple,
                path_save_folder: str) -> int:
    num = 0
    for link in tqdm(links, f"Save images folder {path_save_folder}"):
        try: img = Image.open(urlopen(link))
        except: continue
        path = str(len(os.listdir(path_save_folder))) + ".png"
        path = os.path.join(path_save_folder, path)
        try:
            img.save(path)
            num += 1
        except: continue

    return num


if __name__ == "__main__":
    path_json = input("Path json links: ")
    path_folder = input("Path save folder: ")
    num = 0

    with open(path_json, "r") as f:
        links = json.loads(f.read())

    for name in links.keys():
        save_folder = os.path.join(path_folder, name)
        if not os.path.exists(save_folder):
            os.mkdir(save_folder)

        num += save_images(links[name], save_folder)

    print(f"\nSave {num} images")
