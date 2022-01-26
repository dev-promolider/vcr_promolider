import getTitulo from '../../helpers/titulo'

export const getTitle = async (context) => {

    context.commit('setLoading', true)

    const titulo = await getTitulo()

    context.commit('setTitle', titulo)
    context.commit('setLoading', false)

}