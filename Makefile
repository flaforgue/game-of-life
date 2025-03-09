DOCKER_RUN=docker run --rm -v .:/srv/node -w /srv/node -it -p 3000:3000 node:22-alpine
DOCKER_RUN_TASK=docker run --rm -v .:/srv/node -w /srv/node -it node:22-alpine

build:
	$(DOCKER_RUN) /bin/sh -c 'yarn build'

start:
	$(DOCKER_RUN) /bin/sh -c 'yarn start'

dev:
	$(DOCKER_RUN) /bin/sh -c 'yarn dev'

test:
	$(DOCKER_RUN_TASK) /bin/sh -c 'yarn test'

format:
	$(DOCKER_RUN_TASK) /bin/sh -c 'yarn format:fix'