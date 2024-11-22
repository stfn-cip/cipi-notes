function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container mx-auto pb-4 pl-2 pr-2">{children}</div>;
}
export default RootLayout;
