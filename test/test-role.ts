import { User } from "./core/entity/user.entity";
import { Role } from "./core/entity/enums/role.entity";

try {
  console.log("--- Test 1: Crear usuario con ID numérico (1) ---");
  const user1 = new User("test1@gmail.com", "password123", "testuser1", 1);
  console.log(`ID del Rol: ${user1.getRoleId()}`);
  console.log(`Nombre del Rol: ${user1.getRoleName()}`);

  console.log("\n--- Test 2: Crear usuario con Nombre de rol ('GERENT') ---");
  const user2 = new User("test2@gmail.com", "password123", "testuser2", "GERENT");
  console.log(`ID del Rol: ${user2.getRoleId()}`);
  console.log(`Nombre del Rol: ${user2.getRoleName()}`);

  console.log("\n--- Test 3: Cambiar rol usando setRole('STATS') ---");
  user1.setRole("STATS");
  console.log(`Nuevo ID del Rol: ${user1.getRoleId()}`);
  console.log(`Nuevo Nombre del Rol: ${user1.getRoleName()}`);

  console.log("\n--- Test 4: Verificación de compatibilidad (getRolId) ---");
  console.log(`Resultado de getRolId(): ${user1.getRoleId()}`);

  console.log("\n--- Test 5: Error con rol no válido ---");
  try {
    new User("error@gmail.com", "password123", "error", "INVALID_ROLE");
  } catch (e: any) {
    console.log(`Error capturado correctamente: ${e.message}`);
  }

} catch (error) {
  console.error("Error imprevisto en los tests:", error);
}
