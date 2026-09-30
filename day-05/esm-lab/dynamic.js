 const shouldLoad = true;

if (shouldLoad) {
  const math = await import("./math.js");

  console.log("Dynamic import:");
  console.log("Add:", math.add(7, 8));
  console.log("Square:", math.square(5));
}
 