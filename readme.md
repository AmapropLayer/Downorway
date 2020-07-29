# Downorway
A combo addOn/native application for Firefox in order to download files from norwegianclass101.

## Requirements
Some specific things are required in order to make it work:

- Python3
- Modify each path in the follow files to match your path :
    - `app/downorway.json`
    - `app/downorway_win.bat`
- Adding, in your Windows Register, a key at `\HKEY_LOCAL_MACHINE\SOFTWARE\Mozilla\NativeMessagingHosts\downorway` containing the path to `app/downorway.json`.
- Putting your PHPSESSID in `app/downorway.py`. It is required in order to download some files.

## How does it work ?

### Activating the addOn

In order to activate the addOn, you need to go to `about:debugging`, `This Firefox`, `Load temporary add-on`, then select `manifest.json` at the root of the folder.
For more details, you can go [here](https://blog.mozilla.org/addons/2015/12/23/loading-temporary-add-ons/).

### Downloading a lesson

Clic on the extension button, that must now be in your firefox menu.
An alert should appear, asking for a path. 
This path is the location where the program will create a folder containing the pdfs and the audio from the lesson.
A folder will the be created, named after the lesson, and containing the files.

## Remarks
- There are some bugs with some lessons, I haven't figured out why, and I won't try.
- This has only been tested and is probably only working for lessons containing pdfs and mp3 files.
- Feel free to use/modify it.