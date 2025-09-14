import fs from "fs";
import unzipper from "unzipper";
import epub from "epub";
import * as Jimp from "jimp";

export async function extractCover(epubPath: string, outputImagePath: `${string}.${string}`) {
  const book: any = new epub(epubPath);

  book.on("end", async () => {
    try {
      const coverId = book.metadata.cover;
      const coverFile = book.manifest[coverId].href;

      fs.createReadStream(epubPath)
        .pipe(unzipper.Parse())
        .on("entry", async function (entry) {
          if (entry.path.endsWith(coverFile)) {
            const chunks = [];
            for await (const chunk of entry) chunks.push(chunk);
            const buffer = Buffer.concat(chunks);
            const image = await Jimp.Jimp.read(buffer);
            await image.write(outputImagePath);
          } else {
            entry.autodrain();
          }
        });
    } catch {}
  });

  book.parse();
}