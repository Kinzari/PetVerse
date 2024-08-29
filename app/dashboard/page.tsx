"use client";
import * as React from "react"
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  PawPrint,
  Plus,
  Filter,
  Archive,
  Edit,
} from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/petverse" className="flex items-center gap-2 font-semibold">
              <PawPrint className="h-6 w-6" />
              <span className="">PetVerse</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="/dataentry" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Plus className="h-4 w-4" />
                Data Entry
              </Link>
              <Link href="/archive" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                <Archive className="h-4 w-4" />
                Archive
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-white">
              <nav className="grid gap-2 text-lg font-medium">
                <Link href="/petverse" className="flex items-center gap-2 text-lg font-semibold">
                  <PawPrint className="h-6 w-6" />
                  <span className="">PetVerse</span>
                </Link>
                <Link href="/dashboard" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link href="/dataentry" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <Plus className="h-5 w-5" />
                  Data Entry
                </Link>
                <Link href="/archive" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground">
                  <Archive className="h-5 w-5" />
                  Archive
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/signin')}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {/* <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl">Pet Management</h1>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Pet
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Add Pets</DialogTitle>
                    <DialogDescription>
                      Fill up the following details.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="owner-name" className="text-right">
                        Owner&apos;s Name
                      </Label>
                      <Input
                        id="owner-name"
                        value={newPet.ownerName}
                        onChange={(e) => setNewPet({ ...newPet, ownerName: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contact-number" className="text-right">
                        Contact Number
                      </Label>
                      <Input
                        id="contact-number"
                        value={newPet.contactNumber}
                        onChange={(e) => setNewPet({ ...newPet, contactNumber: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={newPet.address}
                        onChange={(e) => setNewPet({ ...newPet, address: e.target.value })}
                        className="col-span-3"
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="pet-name" className="text-right">
                        Pet&apos;s Name
                      </Label>
                      <Input
                        id="pet-name"
                        value={newPet.petName}
                        onChange={(e) => setNewPet({ ...newPet, petName: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="species" className="text-right">
                        Species
                      </Label>
                      <Input
                        id="species"
                        value={newPet.species}
                        onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="breed" className="text-right">
                        Breed
                      </Label>
                      <Input
                        id="breed"
                        value={newPet.breed}
                        onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date-of-birth" className="text-right">
                        Date of Birth
                      </Label>
                      <Input
                        id="date-of-birth"
                        type="date"
                        value={newPet.dateOfBirth}
                        onChange={(e) => setNewPet({ ...newPet, dateOfBirth: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleAddPet}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Pet List</CardTitle>
              <CardDescription>Manage and view all registered pets</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Owner&apos;s Name</TableHead>
                    <TableHead>Pet Name</TableHead>
                    <TableHead>Species</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pets.map((pet, index) => (
                    <TableRow key={index}>
                      <TableCell>{pet.OwnerName}</TableCell>
                      <TableCell>{pet.PetName}</TableCell>
                      <TableCell>{pet.SpeciesName}</TableCell>
                      <TableCell>{pet.BreedName}</TableCell>
                      <TableCell>{format(new Date(pet.DateOfBirth), "PPP")}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                              <DialogTitle>Edit Pet</DialogTitle>
                              <DialogDescription>
                                Make changes to pet details here. Click save when you&aposre done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-owner" className="text-right">
                                  Owner&apos;s Name
                                </Label>
                                <Input
                                  id="edit-owner"
                                  value={editingPet?.OwnerName || ""}
                                  onChange={(e) => setEditingPet({ ...editingPet, ownerName: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-pet" className="text-right">
                                  Pet&apos;s Name
                                </Label>
                                <Input
                                  id="edit-pet"
                                  value={editingPet?.PetName || ""}
                                  onChange={(e) => setEditingPet({ ...editingPet, petName: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-species" className="text-right">
                                  Species
                                </Label>
                                <Input
                                  id="edit-species"
                                  value={editingPet?.SpeciesName || ""}
                                  onChange={(e) => setEditingPet({ ...editingPet, species: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-breed" className="text-right">
                                  Breed
                                </Label>
                                <Input
                                  id="edit-breed"
                                  value={editingPet?.BreedName || ""}
                                  onChange={(e) => setEditingPet({ ...editingPet, breed: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-dob" className="text-right">
                                  Date of Birth
                                </Label>
                                <Input
                                  id="edit-dob"
                                  type="date"
                                  value={editingPet?.DateOfBirth ? format(new Date(editingPet.DateOfBirth), "yyyy-MM-dd") : ""}
                                  onChange={(e) => setEditingPet({ ...editingPet, dateOfBirth: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="button" onClick={() => handleEditPet(editingPet.PetID)}>
                                Save changes
                              </Button>
                              <TableCell>
                                <Button variant="outline" size="sm" onClick={() => handleArchivePet(pet.PetID)}>
                                  Archive
                                </Button>
                              </TableCell>

                            </DialogFooter>
                          </DialogContent>

                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main> */}
      </div>
    </div>
  );
}