<script>
import { defineComponent, h } from "vue";

export const DashboardIcon = defineComponent({
  props: ["width", "height"],
  setup(props) {
    return () =>
      h("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.width || "1em",
        height: props.height || "1em",
        viewBox: "0 0 24 24",
      }, [
        h("path", {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
          d: "M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"
        }),
      ]);
  },
});

export const OrderIcon = defineComponent({
  props: ["width", "height"],
  setup(props) {
    return () =>
      h("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.width || "1em",
        height: props.height || "1em",
        viewBox: "0 0 24 24",
      }, [
        h("g", {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 2,
        }, [
          h("rect", { width: 14, height: 17, x: 5, y: 4, rx: 2 }),
          h("path", { strokeLinecap: "round", d: "M9 9h6m-6 4h6m-6 4h4" }),
        ]),
      ]);
  },
});

export const ReportIcon = defineComponent({
  props: ["width", "height"],
  setup(props) {
    return () =>
      h("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.width || "1em",
        height: props.height || "1em",
        viewBox: "0 0 24 24",
      }, [
        h("circle", { cx: 12, cy: 6, r: 1, fill: "currentColor" }),
        h("path", {
          fill: "currentColor",
          d: "M6 17h12v2H6zm4-5.17l2.792 2.794l3.932-3.935L18 12V8h-4l1.31 1.275l-2.519 2.519L10 9l-4 4l1.414 1.414z",
        }),
        h("path", {
          fill: "currentColor",
          d: "M19 3h-3.298a5 5 0 0 0-.32-.425l-.01-.012a4.43 4.43 0 0 0-2.89-1.518a2.6 2.6 0 0 0-.964 0a4.43 4.43 0 0 0-2.89 1.518l-.01.012a5 5 0 0 0-.32.424V3H5a3.003 3.003 0 0 0-3 3v14a3.003 3.003 0 0 0 3 3h14a3.003 3.003 0 0 0 3-3V6a3.003 3.003 0 0 0-3-3m1 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4.55a2.5 2.5 0 0 1 4.9 0H19a1 1 0 0 1 1 1Z",
        }),
      ]);
  },
});

export const ChevronRight = defineComponent({
  props: ["width", "height"],
  setup(props) {
    return () =>
      h("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: props.width || "1em",
        height: props.height || "1em",
        viewBox: "0 0 24 24",
      }, [
        h("path", {
          fill: "currentColor",
          d: "m8.086 17.5l5.5-5.5l-5.5-5.5L9.5 5.086L16.414 12L9.5 18.914z",
        }),
      ]);
  },
});
</script>
