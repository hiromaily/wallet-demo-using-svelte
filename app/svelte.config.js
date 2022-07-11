//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	// compilerOptions: {
	// 	format: "cjs"
	// },
	kit: {
		//adapter: adapter(),
    adapter: adapter({
			// for @sveltejs/adapter-static
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false
    }),
    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true
    },
		paths: {
			base: 'svelte-sample/app/build',
	  },		
		alias: {
			$components: 'src/components',
			$codec: 'src/codec'
		}
	}
};

export default config;
