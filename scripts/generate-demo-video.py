from pathlib import Path
import os

from moviepy import AudioFileClip, ImageClip, concatenate_videoclips
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FRAMES = ROOT / "outputs" / "demo-frames"
OUT = ROOT / "outputs" / "tongchen-demo.mp4"
AUDIO = ROOT / "outputs" / "demo-narration.wav"

W, H = 1440, 810
BG = "#f4f0e7"
INK = "#26332d"
MUTED = "#7c837d"
GREEN = "#587566"


def font(size, serif=False):
    candidates = (
        ["/System/Library/Fonts/NewYork.ttf", "/System/Library/Fonts/Supplemental/Georgia.ttf"]
        if serif
        else ["/System/Library/Fonts/SFNS.ttf", "/System/Library/Fonts/Helvetica.ttc"]
    )
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def title_card(path, closing=False):
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    draw.ellipse((100, 92, 130, 122), fill=GREEN)
    draw.ellipse((116, 92, 146, 122), fill="#b39668")
    draw.text((174, 82), "同尘  TONGCHEN", font=font(34), fill=INK)
    headline = "Share a little of life,\nwithout facing the whole world." if closing else "Share without pressure.\nConnect beyond agreement."
    draw.multiline_text((100, 250), headline, font=font(68, serif=True), fill=INK, spacing=18)
    sub = "UNDERSTAND  ·  DELIVER  ·  RECEIVE" if not closing else "tongchen-light.still-wasp-8803.chatgpt.site"
    draw.text((104, 590), sub, font=font(24), fill=GREEN)
    draw.text((104, 680), "Built with Codex + GPT-5.6", font=font(22), fill=MUTED)
    img.save(path)


def normalized(path):
    img = Image.open(path).convert("RGB")
    ratio = max(W / img.width, H / img.height)
    size = (round(img.width * ratio), round(img.height * ratio))
    img = img.resize(size, Image.Resampling.LANCZOS)
    left = (img.width - W) // 2
    top = (img.height - H) // 2
    return img.crop((left, top, left + W, top + H))


def main():
    title = FRAMES / "00-title.png"
    closing = FRAMES / "09-closing.png"
    title_card(title)
    title_card(closing, closing=True)

    sequence = [
        title,
        FRAMES / "01-home.png",
        FRAMES / "02-english.png",
        FRAMES / "03-composer.png",
        FRAMES / "04-boundary.png",
        FRAMES / "05-understanding.png",
        FRAMES / "02-english.png",
        FRAMES / "06-meet.png",
        FRAMES / "07-profile.png",
        FRAMES / "08-safety.png",
        closing,
    ]

    prepared = []
    for index, source in enumerate(sequence):
        target = FRAMES / f"render-{index:02d}.png"
        normalized(source).save(target, quality=95)
        prepared.append(target)

    audio = AudioFileClip(str(AUDIO))
    weights = [0.07, 0.09, 0.07, 0.09, 0.09, 0.13, 0.12, 0.11, 0.10, 0.08, 0.05]
    durations = [audio.duration * weight for weight in weights]
    clips = [ImageClip(str(path)).with_duration(duration) for path, duration in zip(prepared, durations)]
    video = concatenate_videoclips(clips, method="compose").with_audio(audio)
    video.write_videofile(
        str(OUT), fps=24, codec="libx264", audio_codec="aac",
        preset="veryfast", bitrate="4000k", threads=4, logger=None,
    )
    print(f"{OUT}\n{video.duration:.2f} seconds")


if __name__ == "__main__":
    main()
