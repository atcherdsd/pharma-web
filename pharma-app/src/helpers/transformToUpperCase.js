export default function tranformToUpperCase(context) {
  return context.length > 1
    ? context[0].toUpperCase() + context.slice(1)
    : context[0].toUpperCase();
}
