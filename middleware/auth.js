export default function ({ redirect, store, route }) {
  const user = store.state.user['user']
  if (!user && route.path === '/likes') {
    redirect('/')
  }
  if (!user && route.path === '/watch') {
    redirect('/')
  }
}
