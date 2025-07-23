import { MultiSelect } from "./mutli-select";

const frameworksList = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "qwik.dev",
    label: "Qwik.dev",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "svelte",
    label: "Svelte",
  },
  {
    value: "vue.js",
    label: "Vue.js",
  },
];

const MultiSelectComponent = () => {
  return (
    <div className="h-full min-h-[25vh]">
      <MultiSelect
        options={frameworksList}
        onValueChange={() => {}}
        defaultValue={["next.js"]}
        placeholder="Select options"
        maxCount={3}
      />
    </div>
  );
};

export default MultiSelectComponent;
