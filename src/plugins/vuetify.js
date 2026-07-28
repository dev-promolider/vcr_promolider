

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    breakpoint: {
        mobileBreakpoint: 'sm' // This is equivalent to a value of 960
    },
    theme: {
        themes: {
            light: {
                primary: "#059669",      // Emerald 600
                secondary: "#0F172A",    // Slate 900
                accent: "#10B981",       // Emerald 500
                error: "#F43F5E",        // Rose 500
                info: "#3B82F6",         // Blue 500
                success: "#10B981",      // Emerald 500
                warning: "#F59E0B",      // Amber 500
                lightblue: "#0EA5E9",
                yellow: "#F59E0B",
                pink: "#EC4899",
                orange: "#F97316",
                magenta: "#A855F7",
                darkblue: "#0F172A",
                gray: "#64748B",
                neutralgray: "#94A3B8",
                green: "#059669",
                red: "#F43F5E",
                darkblueshade: "#1E293B",
                lightgray: "#E2E8F0",
                lightpink: "#FCE7F3",
                white: "#FFFFFF"
            }
        }
    }
}

export default new Vuetify(opts)