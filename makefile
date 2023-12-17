.PHONY: run

run:
	docker compose down
	docker rmi cashbycard-app:latest
	docker compose up -d
