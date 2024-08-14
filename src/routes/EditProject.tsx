import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/EditProject')({
  component: () => <div>Hello /EditProject!</div>
})