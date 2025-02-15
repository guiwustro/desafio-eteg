const NotFound = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-gray-800">
					Página Não Encontrada
				</h1>
				<p className="text-lg text-gray-600 mt-4">
					Desculpe, a página que você está procurando não existe.
				</p>
			</div>
		</div>
	);
};

export default NotFound;
