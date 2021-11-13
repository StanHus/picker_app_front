const put = async (text: string, id: number | undefined) => {
  try {
    const body = { text };
    await fetch(`https://dry-gorge-37048.herokuapp.com/titles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    window.location.href = "/game";
  } catch (err) {
    console.error(err);
  }
};

const post = async (titles: string) => {
  try {
    await fetch("https://dry-gorge-37048.herokuapp.com/input", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: titles,
      }),
    });
    window.location.href = "/game";
  } catch (err) {
    console.error(err);
  }
};

const get = async () => {
  try {
    const response = await fetch(
      "https://dry-gorge-37048.herokuapp.com/titles"
    );
    const jsonData = await response.json();
    return jsonData[0];
  } catch (err) {
    console.error(err);
  }
};

export { put, post, get };
