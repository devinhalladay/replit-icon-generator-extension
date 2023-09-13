{ pkgs }: {
	deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.prettier
    pkgs.nodePackages.typescript-language-server
    pkgs.nodePackages.yarn
    pkgs.replitPackages.jest
	];
}