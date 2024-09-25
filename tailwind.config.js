/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}"
    ],
    theme: {
        extend: {
            colors: {
                'text': '#fff',
                'link': '#42b883',
                'linkHighlight': '#42d392',
                'background': '#1a1a1a',
                'field-background': '#fff',
                'field-text': '#1a1a1a',
                'field-border': '#000',
                'overley': 'rgba(255, 255, 255, .2)',
                'divider': '#5454547a',
                'border': '#fff',
                'active': '#42b883',
                'activeHighlight': '#42d392',
                'danger': '#dc3545',
                'danger-active': '#fc0c24'
            }
        }
    },
    plugins: []
}
