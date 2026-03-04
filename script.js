const button = document.getElementById('generateBtn');
const output = document.getElementById('output');

button.addEventListener('click', async () => {
  const topic = document.getElementById('topic').value.trim();
  const level = document.getElementById('level').value;
  const duration = document.getElementById('duration').value;

  if (!topic) {
    alert('Gib bitte ein Thema ein!');
    return;
  }

  output.innerHTML = "Generiere deine Präsentation… ⏳";

  // Prompt an backend
  const prompt = `
Schreibe eine Präsentation auf Deutsch über "${topic}" für Schüler der Stufe ${level}.
Sprache locker, verständlich, wie umgangssprachlich in der Schule.
Schreibe je nach Stufe:
- niedrige Stufen (5-7): einfache Sätze, kleine Fehler möglich
- mittlere Stufen (8-10, EF): normal, einige kleine Fehler, verständlich
- obere Stufen (Q1-Q2): komplex, gut formuliert, fast fehlerfrei
Struktur:
- kurze Einleitung
- 4–6 Hauptpunkte
- kurzes Fazit
- optional Quizfragen 2–3 Stück
Dauer: ${duration}.
`;

  try {
    const response = await fetch('/generate', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({prompt})
    });

    const data = await response.json();
    output.innerHTML = data.text;
  } catch(err) {
    output.innerHTML = "Fehler beim Generieren. Versuch später nochmal.";
    console.error(err);
  }
});
