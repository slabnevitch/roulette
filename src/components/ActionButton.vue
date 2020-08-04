<template>
  <span>
    <button
      v-if="tag === 'button'"
      :class="classes"
      type="button"
      v-on="$listeners">
      <slot />
    </button>
    <a
      v-else-if="tag === 'a'"
      :class="classes"
      :href="href">
      <slot />
    </a>
  </span>
</template>

<script>
const LIGHT = 'light';
const DARK = 'dark';

export default {
  name: 'ActionButton',
  props: {
    theme: {
      type: String,
      default: LIGHT,
    },
    tag: {
      type: String,
      default: 'button',
    },
    href: {
      type: String,
      default: '',
    }
  },
  computed: {
    classes() {
      const classList = ['action__button'];
      switch (this.theme) {
        case LIGHT:
          classList.push(`action__button--${LIGHT}`);
          break;
        case DARK:
          classList.push(`action__button--${DARK}`);
          break;
      }

      if (this.tag === 'a') {
        classList.push('external-link');
      }

      return classList;
    },
  },
};
</script>

<style scoped>
  /* Action Button */
  .action__button {
    border: none;
    background: var(--background-color, #1C0057);
    color: #FFFFFF;
    line-height: 1.1;
    text-transform: uppercase;
  }
  @media (min-width: 600px) {
    .action__button {
      padding: 1rem 2.1rem;
      font-size: 3rem;
      border-radius: 3rem;
    }
  }
  @media (max-width: 599.99px) {
    .action__button {
      padding: 0.7rem 1.4rem;
      font-size: 1.4rem;
      border-radius: 1.4rem;
    }
  }
  .action__button--light {
    --background-color: #0051EF;
  }

  .external-link {
    display: inline-block;
    text-decoration: none;
  }
</style>