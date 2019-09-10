import { QueryOptions } from '../engine/types/Query'
import { Mutation } from '../engine/types/Mutation'
import { MutationRenderInput } from '../types'

import { useQueryExecutor } from './useQueryExecutor'
import { useStaticInput } from './useStaticInput'
import { useDataEngine } from './useDataEngine'
import { useCallback } from 'react'

const empty = {}
export const useDataMutation = (
    mutation: Mutation,
    { onCompleted, onError, variables = empty }: QueryOptions = {}
): MutationRenderInput => {
    const engine = useDataEngine()
    const [theMutation] = useStaticInput<Mutation>(mutation, {
        warn: true,
        name: 'mutation',
    })
    const execute = useCallback(
        options => engine.mutate(theMutation, options),
        [engine, theMutation]
    )
    const { refetch: mutate, called, loading, error, data } = useQueryExecutor({
        execute,
        variables,
        singular: false,
        immediate: false,
        onCompleted,
        onError,
    })

    return [mutate, { called, loading, error, data }]
}