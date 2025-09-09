import { brand } from "@/lib/constants/brand";

export default function Plausible() {
  return (
    <script
      defer
      data-domain={brand.website}
      src="https://plausible.io/js/script.tagged-events.js"
    ></script>
  );
}
