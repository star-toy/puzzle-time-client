import ResizeLayout from '../_components/_layouts/resize-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ResizeLayout>{children}</ResizeLayout>;
}
