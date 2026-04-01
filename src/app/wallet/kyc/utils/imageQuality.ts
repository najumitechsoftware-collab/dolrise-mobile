export async function checkImageQuality(
  file: File
): Promise<{ ok: boolean; reason?: string }> {
  if (file.size < 100_000) {
    return {
      ok: false,
      reason: "Image too small",
    };
  }

  const img = new Image();
  const url = URL.createObjectURL(file);

  return new Promise((resolve) => {
    img.onload = () => {
      URL.revokeObjectURL(url);

      if (img.width < 800 || img.height < 500) {
        resolve({
          ok: false,
          reason: "Image resolution too low",
        });
      }

      resolve({ ok: true });
    };

    img.onerror = () =>
      resolve({
        ok: false,
        reason: "Invalid image",
      });

    img.src = url;
  });
}
