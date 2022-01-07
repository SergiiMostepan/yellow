export default function ({ store, route, redirect }) {
	if (route.path === '/genre') {
		console.log('go')
		return redirect({ name: '/' })
	}
}