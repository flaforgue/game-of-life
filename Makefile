DOCKER_RUN=docker run --rm -v .:/srv/node -w /srv/node -p 3000:3000 node:22-alpine
DOCKER_RUN_TASK=docker run --rm -v .:/srv/node -w /srv/node node:22-alpine

install:
	$(DOCKER_RUN_TASK) /bin/sh -c 'yarn install:lock'

start:
	$(DOCKER_RUN) /bin/sh -c 'yarn start'

dev:
	$(DOCKER_RUN) /bin/sh -c 'yarn dev'

format-check:
	$(DOCKER_RUN_TASK) /bin/sh -c 'yarn format:check'

format-fix:
	$(DOCKER_RUN_TASK) /bin/sh -c 'yarn format:fix'

test:
	$(DOCKER_RUN_TASK) /bin/sh -c 'yarn test'

build:
	$(DOCKER_RUN_TASK) /bin/sh -c 'yarn build'