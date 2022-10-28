// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

/** @typedef {import('../src/types').Section} Section */
/** @typedef {import('../src/types').Style} Style */

/**
 * @param {string} str
 * @returns {string[]}
 */
const format = (str) => {
  // フォーマットして配列に
  const lines = prettier
    .format(str, { parser: "css", printWidth: 1e3 })
    .split("\n");

  /** @type {string[]} */
  const formatted = [];

  for (const line of lines) {
    // 空行は無視
    if (line === "") continue;

    // 前の行がセレクターだったら後ろに追加
    const lastIndex = formatted.length - 1;
    if (formatted[lastIndex]?.endsWith(",")) {
      formatted[lastIndex] += ` ${line}`;
      continue;
    }

    formatted.push(line);
  }

  return formatted;
};

/**
 * @param {string[]} lines
 * @returns {Section[]}
 */
const parse = (lines) => {
  /** @type {Section[]} */
  const sections = [];

  /** @type {Section} */
  let currentSection = { title: "", styles: [] };
  let current = 0;

  while (current < lines.length) {
    const line = lines[current];

    // 行コメントは新しいセクション
    if (/^\/\*.+\*\/$/.test(line)) {
      if (currentSection.title) {
        sections.push(currentSection);
      }

      currentSection = {
        title: line.slice(2, -2).trim(),
        styles: [],
      };

      current++;
      continue;
    }

    // ブロックコメントは終わりまでスキップ
    if (line.startsWith("/*")) {
      while (!lines[++current].endsWith("*/")) {} // eslint-disable-line no-empty
    }

    // セレクター
    if (line.endsWith("{")) {
      // 閉じタグまでを変数に格納
      let contents = "";
      while (!lines[++current].endsWith("}")) {
        contents += `${lines[current].trim()}\n`;
      }

      // spacing はセレクターをバラしてスタイルに反映
      if (currentSection.title === "spacing") {
        const { styles } = currentSection;
        const selectors = line
          .slice(0, -2)
          .split(",")
          .map((v) => v.trim());

        for (const selector of selectors) {
          const style = styles.find((v) => v.selector === selector);
          if (style) {
            style.contents += contents;
          } else {
            styles.push({ selector, contents });
          }
        }
      } else {
        const selector = line.slice(0, -2);
        currentSection.styles.push({ selector, contents });
      }

      current++;
      continue;
    }

    current++;
  }
  sections.push(currentSection);

  return sections;
};

/**
 * @param {string} inputFile
 * @param {string} outputFile
 */
const convert = async (inputFile, outputFile) => {
  const dir = path.dirname(fileURLToPath(import.meta.url));
  const inputPath = path.resolve(dir, inputFile);
  const outputPath = path.resolve(dir, "../src/assets", outputFile);

  const cssFile = await fs.readFile(inputPath, { encoding: "utf-8" });
  const formatted = format(cssFile);
  const sections = parse(formatted);
  await fs.writeFile(outputPath, JSON.stringify(sections, null, 2));
};

convert("bootstrap-utilities4.6.2.css", "data4.6.2.json");
convert("bootstrap-utilities5.0.2.css", "data5.0.2.json");
