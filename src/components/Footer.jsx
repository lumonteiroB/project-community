function Footer() {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © {new Date().getFullYear()} Communities. Todos os direitos reservados.
          </p>
        </div>
      </div>
    );
  }
  
  export default Footer;