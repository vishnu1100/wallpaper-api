import os
import re

# Set the folder containing images
FOLDER_PATH = r"E:/Workspace/Nodejs/wallpaper-api/public/mobile"

def delete_numbered_duplicates(folder_path):
    deleted_count = 0
    files = set(os.listdir(folder_path))  # Store filenames in a set for fast lookup

    # Regex to match filenames like "image (1).jpg"
    pattern = re.compile(r"^(.*) \(\d+\)(\..+)$")

    for filename in list(files):  # Iterate over a copy of the set to modify safely
        match = pattern.match(filename)
        if match:
            base_name, extension = match.groups()
            original_file = base_name + extension  # Construct the original filename

            if original_file in files:  # Check if the base file exists
                file_path = os.path.join(folder_path, filename)
                print(f"Deleting duplicate: {file_path}")
                os.remove(file_path)  # Delete duplicate
                deleted_count += 1

    print(f"✅ {deleted_count} numbered duplicates removed.")

delete_numbered_duplicates(FOLDER_PATH)
