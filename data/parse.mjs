// @ts-check
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

/** @typedef {{ title: string, styles: Style[] }} Section */
/** @typedef {{ selector: string, contents: string[] }} Style */

/**
 * @param {string} str
 * @returns {string[]}
 */
const format = (str) => {
  // フォーマットして配列に
  const lines = prettier.format(str, { parser: "css" }).split("\n");

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

    // コメントは新しいセクション
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

    // セレクター
    if (line.endsWith("{")) {
      // 閉じタグまでを配列に格納
      /** @type {string[]} */
      const contents = [];
      while (!lines[++current].endsWith("}")) {
        contents.push(lines[current].trim());
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
            style.contents.push(...contents);
          } else {
            styles.push({ selector, contents: [...contents] });
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

const dir = path.dirname(fileURLToPath(import.meta.url));
const cssFile = await fs.readFile(
  path.resolve(dir, "./bootstrap-utilities_no-media.css"),
  { encoding: "utf-8" }
);
const formatted = format(cssFile);
const sections = parse(formatted);
await fs.writeFile(
  path.resolve(dir, "../src/assets/data.json"),
  JSON.stringify(sections, null, 2)
);
