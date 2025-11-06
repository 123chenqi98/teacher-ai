import { createApp, h } from 'vue'

export function openModal(Comp: any, props: Record<string, any> = {}) {
  return new Promise<{ type: 'confirm' | 'close'; payload?: any }>((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const app = createApp({
      render() {
        return h(Comp, {
          ...props,
          onConfirm: (payload: any) => {
            resolve({ type: 'confirm', payload })
            app.unmount()
            container.remove()
          },
          onClose: (payload: any) => {
            resolve({ type: 'close', payload })
            app.unmount()
            container.remove()
          },
        })
      },
    })
    app.mount(container)
  })
}