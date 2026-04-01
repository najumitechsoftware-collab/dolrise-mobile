export async function uploadImage(
  file: File,
  type:
    | "id_front"
    | "id_back"
    | "selfie"
): Promise<string> {
  const res = await fetch(
    "/api/kyc/upload-url",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error("UPLOAD_URL_FAILED");
  }

  await fetch(data.uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "image/jpeg",
    },
    body: file,
  });

  return data.fileUrl;
}
