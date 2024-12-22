import sys
import os
import json
from pytube import YouTube, Playlist


def download_video(url, save_path):
    """Download a single YouTube video"""
    try:
        yt = YouTube(url)
        video = yt.streams.get_highest_resolution()

        # sanitize filename
        safe_filename = "".join(
            c for c in video.title if c.isalnum() or c in (' ', '.', '_')).rstrip()
        output_path = os.path.join(save_path, f"{safe_filename}.mp4")

        video.download(output_path=save_path)

        return [f"Successfully downloaded: {video.title}"]
    except Exception as e:
        return [f"Error downloading video: {str(e)}"]


def download_playlist(url, save_path):
    """Download a YouTube playlist"""
    try:
        playlist = Playlist(url)
        download_results = []

        for video_url in playlist.video_urls:
            try:
                yt = YouTube(video_url)
                video = yt.streams.get_highest_resolution()

                safe_filename = "".join(
                    c for c in video.title if c.isalnum() or c in (' ', '.', '_')).rstrip()
                output_path = os.path.join(save_path, f"{safe_filename}.mp4")

                video.download(output_path=save_path)
                download_results.append(f"Downloaded: {video.title}")
            except Exception as e:
                download_results.append(f"Error downloading video: {str(e)}")

        return download_results
    except Exception as e:
        return [f"Error downloading playlist: {str(e)}"]


def main():
    if len(sys.argv) != 4:
        print(json.dumps(["Invalid number of arguments"]))
        sys.exit(1)

    url = sys.argv[1]
    save_path = sys.argv[2]
    download_type = sys.argv[3]

    os.makedirs(save_path, exist_ok=True)

    if download_type == 'video':
        results = download_video(url, save_path)
    elif download_type == 'playlist':
        results = download_playlist(url, save_path)
    else:
        results = ["Invalid download type"]

    print(json.dumps(results))


if __name__ == '__main__':
    main()
