/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import TrackPlayer from './TrackPlayer.svelte'

test('shows proper heading when rendered', () => {
    const { getByText } = render(TrackPlayer)

    expect(getByText('Welcome to SvelteKit')).toBeInTheDocument()
})