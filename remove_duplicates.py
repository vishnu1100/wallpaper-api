import os
import re
import imagehash
from PIL import Image

# Set the folder containing images
FOLDER_PATH = r"E:/Workspace/Nodejs/wallpaper-api/public/mobile"

def delete_duplicates(folder_path):
    deleted_count = 0
    files = set(os.listdir(folder_path))  # Store filenames for quick lookup
    hashes = {}  # Store image hashes

    # Regex pattern to match filenames like "image (1).jpg"
    pattern = re.compile(r"^(.*) \(\d+\)(\..+)$")

    for filename in list(files):  # Iterate over a copy of the set
        file_path = os.path.join(folder_path, filename)

        # Check and delete numbered duplicates (e.g., "image (1).jpg")
        match = pattern.match(filename)
        if match:
            base_name, extension = match.groups()
            original_file = base_name + extension  # Construct original filename
            if original_file in files:  # Check if the base file exists
                print(f"Deleting numbered duplicate: {file_path}")
                os.remove(file_path)
                deleted_count += 1
                continue  # Move to next file

        # Check for duplicates using image hashing
        try:
            with Image.open(file_path) as img:
                img_hash = imagehash.phash(img)  # Perceptual hash for accuracy
                if img_hash in hashes:
                    print(f"Deleting hash duplicate: {file_path}")
                    os.remove(file_path)  # Delete duplicate
                    deleted_count += 1
                else:
                    hashes[img_hash] = file_path  # Store unique images
        except Exception as e:
            print(f"Skipping file {filename}: {e}")  # Handle non-image files

    print(f"✅ {deleted_count} duplicates removed.")

delete_duplicates(FOLDER_PATH)
