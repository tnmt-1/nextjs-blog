import datetime


def main():
    now = datetime.datetime.today()
    filename = now.strftime("%Y%m%d000000") + ".md"

    with open(f"posts/{filename}", "w") as f:
        frontmatter = ""
        frontmatter += "---\n"
        frontmatter += "title: \n"
        frontmatter += f"date: {now.strftime('%Y-%m-%dT%H:%M:%S+09:00')}\n"
        frontmatter += "tags: []\n"
        frontmatter += "---\n"
        f.write(frontmatter)


if __name__ == "__main__":
    main()
