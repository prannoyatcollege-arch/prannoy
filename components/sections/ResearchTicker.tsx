"use client";

import { useEffect, useState } from "react";

type Item = {
  text: string;
  link: string;
};

export default function ResearchTicker() {
  const [feed, setFeed] = useState<Item[]>([]);

  // 🧠 FETCH ARXIV PAPERS (AI / ML / CS)
  const fetchArxiv = async () => {
    try {
      const res = await fetch(
        "https://export.arxiv.org/api/query?search_query=cat:cs.AI&start=0&max_results=5"
      );
      const text = await res.text();

      const matches = [...text.matchAll(/<title>(.*?)<\/title>/g)].slice(1);

      return matches.map((m) => ({
        text: `📄 ${m[1]}`,
        link: "https://arxiv.org/list/cs.AI/recent",
      }));
    } catch {
      return [];
    }
  };

  // 🧠 FETCH GITHUB TRENDING AI (SIMPLIFIED PUBLIC PAGE)
  const fetchGitHub = async () => {
    try {
      const res = await fetch(
        "https://api.github.com/search/repositories?q=ai&sort=stars&order=desc&per_page=5"
      );
      const data = await res.json();

      return data.items.map((repo: any) => ({
        text: `⭐ ${repo.full_name}`,
        link: repo.html_url,
      }));
    } catch {
      return [];
    }
  };

  // 🧠 COMBINE ALL FEEDS
  const loadFeed = async () => {
    const [arxiv, github] = await Promise.all([
      fetchArxiv(),
      fetchGitHub(),
    ]);

    const combined = [...arxiv, ...github].filter(Boolean);

    setFeed(combined.length ? combined : [
      {
        text: "🧠 Neural research feed initializing...",
        link: "https://arxiv.org",
      },
    ]);
  };

  useEffect(() => {
    loadFeed();

    const interval = setInterval(loadFeed, 20000); // refresh every 20s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-yellow-400/30 bg-black/40 backdrop-blur-xl group">

      {/* glow edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10" />

      {/* MARQUEE */}
      <div
        className="flex w-max gap-14 py-4 px-6 animate-marqueeSlow group-hover:[animation-play-state:paused]"
      >
        {[...feed, ...feed].map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            className="
              whitespace-nowrap text-sm
              text-yellow-300
              hover:text-yellow-100
              transition
              drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]
              max-w-[500px]
            "
          >
            ⚡ {item.text}
          </a>
        ))}
      </div>
    </div>
  );
}