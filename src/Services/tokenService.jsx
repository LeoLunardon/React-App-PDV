function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
      window.location = "/";
      console.error("Token não encontrado");
      return null;
  } else {
    return token;
  }
}

export default getToken;
