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

export { put };
